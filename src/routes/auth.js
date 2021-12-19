import { Router } from 'express'
import passport from 'passport'
import { catchAsync } from '../middlewares/errors'
import AuthController from '../controllers/authController'

export default () => {
    const api = Router()

    api.post('/register', AuthController.register)

    api.post(
        '/login',
        passport.authenticate('local', { session: false }),
        AuthController.login
    )

    return api
}
