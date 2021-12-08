import pluralize from "pluralize";

const splitToArray = (data, sign) => data.replace(/ /g, "").split(sign);

const synonymTheme = (singularForm, pluralUncountable, pluralCountable) => ({
  singularForm,
  pluralUncountable,
  pluralCountable,
});

const checkPluralForm = (pluralForm, singularForm) => {
  // reg.
  if (pluralForm === "reg.")
    return synonymTheme(
      singularForm,
      pluralize.plural(singularForm),
      pluralize.plural(singularForm)
    );
  // -
  else if (pluralForm === "-") return synonymTheme(singularForm, null, null);
  // - / reg.
  else if (pluralForm === "-/reg.")
    return synonymTheme(singularForm, null, pluralize.plural(singularForm));
  // reg. / -
  else if (pluralForm === "reg./-") {
    return synonymTheme(singularForm, pluralize.plural(singularForm), null);
  }
  // - / something
  else if (new RegExp("^" + "-/", "i").test(pluralForm)) {
    const [, countable] = pluralForm.split("/");
    return synonymTheme(singularForm, null, countable);
  }
  // reg. / something
  else if (new RegExp("^" + "reg./", "i").test(pluralForm)) {
    const [, countable] = pluralForm.split("/");
    return synonymTheme(
      singularForm,
      pluralize.plural(singularForm),
      countable
    );
  }
  // something / something
  // or
  // something
  else {
    const [uncountable, countable] = pluralForm.split("/");
    return countable
      ? synonymTheme(singularForm, uncountable, countable)
      : synonymTheme(singularForm, uncountable, null);
  }
};

const processSynonyms = (singularWords, pluralWords) => {
  const singularWordsArray = splitToArray(singularWords, "/");
  const pluralWordsArray = splitToArray(pluralWords, "|");
  return singularWordsArray.reduce((acc, curr, index) => {
    const pluralWordsArrayLength = pluralWordsArray.length;
    if (pluralWordsArrayLength === 1)
      return [...acc, checkPluralForm(pluralWordsArray[0], curr)];
    else return [...acc, checkPluralForm(pluralWordsArray[index], curr)];
  }, []);
};

const findReference = (data, lookForName) => {
  // [first word, rest words]
  const [zob, ...fullNameArray] = lookForName.split(" ");
  // full word
  const fullName = fullNameArray.join(" ");
  return zob === "zob."
    ? data.find((word) => word["TERMIN-POL"] === fullName)
    : null;
};

export const reduceData = (data) =>
  data.reduce((acc, curr) => {
    const foundObject = findReference(data, curr["TERMIN-ANG-SIN"]);
    // check if there is a reference to a different object
    return [
      ...acc,
      {
        polishWord: curr["TERMIN-POL"],
        synonyms: foundObject
          ? processSynonyms(
              foundObject["TERMIN-ANG-SIN"],
              foundObject["TERMIN-ANG-PLU"]
            )
          : processSynonyms(curr["TERMIN-ANG-SIN"], curr["TERMIN-ANG-PLU"]),
        definition: foundObject ? foundObject["DEFINICJA"] : curr["DEFINICJA"],
        reference: foundObject ? true : false,
      },
    ];
  }, []);
