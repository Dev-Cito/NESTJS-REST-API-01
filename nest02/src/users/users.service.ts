import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  findByEmail(email: string) {
    return this.usersRepository.findOne({
      where: { email },
      select: ['id', 'name', 'email', 'password'],
    });
  }

  create(userData: Partial<User>) {
    const user = this.usersRepository.create(userData);
    return this.usersRepository.save(user);
  }

  findAll() {
    return this.usersRepository.find();
  }

  findOne(id: number) {
    return this.usersRepository.findOne({ where: { id } });
  }

  async update(id: number, updateData: Partial<User>) {
    if (!updateData || Object.keys(updateData).length === 0) {
      throw new Error('No update values provided');
    }

    await this.usersRepository.update(id, updateData);
    return this.findOne(id);
  }

  async remove(id: number) {
    await this.usersRepository.delete(id);
    return { deleted: true };
  }
}
