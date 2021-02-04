import { Router } from 'express'
import { getRepository } from 'typeorm'

import User from './typeorm/entities/User'

const routes = Router();

routes.post('/', async(request, response) => {
  const { name } = request.body;

  const usersRepository = getRepository(User);
  const user = usersRepository.create({ name })

  await usersRepository.save(user);

  return response.status(201).json(user)
})

routes.get('/all', async(request, response) => {
  const usersRepository = getRepository(User);
  const users = await usersRepository.find();

  return response.status(200).json(users)
})

routes.get('/:id', async(request, response) => {
  const { id } = request.params;

  const usersRepository = getRepository(User);
  const user = await usersRepository.findOne({ where: { id } })

  return response.status(200).json(user ? user : {})
})

routes.put('/:id', async(request, response) => {
  const { id } = request.params;

  const { name } = request.body;

  const usersRepository = getRepository(User);
  const user = await usersRepository.findOne({ where: { id } })

  if(!user)
    return response.status(400).json({message: 'User not found'})
  
  const userUpdate = {...user, name}

  await usersRepository.save(userUpdate)

  return response.status(200).json(userUpdate)
})

routes.delete('/:id', async(request, response) => {
  const { id } = request.params;

  const usersRepository = getRepository(User);
  const user = await usersRepository.findOne({ where: { id } })

  if(!user)
    return response.status(400).json({message: 'User not found'})

  await usersRepository.delete(user.id)

  return response.status(200).json(user)
})

export default routes