import type { UserRepository } from "../../src/application/repositories/UserRepository.js";
import type { User } from "../../src/domain/entities/User.js";

export class InMemoryUserRepository implements UserRepository {
  private readonly users: User[] = [];

  async create(user: User): Promise<User> {
    this.users.push(user);

    return user;
  }

  async findById(id: string): Promise<User | null> {
    return this.users.find((user) => user.id === id) ?? null;
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.users.find((user) => user.email === email) ?? null;
  }

  async findAll(): Promise<User[]> {
    return [...this.users];
  }

  async update(user: User): Promise<User> {
    const index = this.users.findIndex(
      (currentUser) => currentUser.id === user.id,
    );

    if (index !== -1) {
      this.users[index] = user;
    }

    return user;
  }

  async deleteById(id: string): Promise<boolean> {
    const index = this.users.findIndex(
      (user) => user.id === id,
    );

    if (index === -1) {
      return false;
    }

    this.users.splice(index, 1);

    return true;
  }
}