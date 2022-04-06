import { Request, Response, Router } from 'express'
import { usersFactory } from '../../app/factory'

const userController = usersFactory()

const userRoute = Router()

const get = async (req: Request, res: Response): Promise<void> => {
  res.send('get')
}

const post = async (req: Request, res: Response): Promise<void> => {
  const { name, email, password } = req.body
  const { status, message } = await userController.createUser({ name, email, password })
  res.status(status).json(message)
}

userRoute.get('/', get)

userRoute.post('/', post)

export { userRoute }
