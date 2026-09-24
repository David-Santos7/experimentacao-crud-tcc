import { beforeEach, describe, expect, it } from "vitest";

import { UpdateUser } from "../../src/application/use-cases/UpdateUser.js";
import {
  User,
  type UserProps,
} from "../../src/domain/entities/User.js";
import { InMemoryUserRepository } from "../doubles/InMemoryUserRepository.js";

const INITIAL_DATE = new Date("2026-01-01T00:00:00.000Z");

function makeUser(
  overrides: Partial<UserProps> = {},
): User {
  return new User({
    id: "user-1",
    name: "Ana Silva",
    email: "ana@example.com",
    role: "USER",
    createdAt: INITIAL_DATE,
    updatedAt: INITIAL_DATE,
    ...overrides,
  });
}

describe("UpdateUser", () => {
  let repository: InMemoryUserRepository;
  let updateUser: UpdateUser;

  beforeEach(() => {
    repository = new InMemoryUserRepository();
    updateUser = new UpdateUser(repository);
  });

  it("should update and persist user data", async () => {
    const user = makeUser();

    await repository.create(user);

    const result = await updateUser.execute({
      id: user.id,
      name: "Maria Silva",
      email: "MARIA@EXAMPLE.COM",
      role: "ADMIN",
    });

    expect(result.id).toBe(user.id);
    expect(result.name).toBe("Maria Silva");
    expect(result.email).toBe("maria@example.com");
    expect(result.role).toBe("ADMIN");

    expect(result.createdAt).toEqual(INITIAL_DATE);

    expect(result.updatedAt.getTime()).toBeGreaterThan(
      INITIAL_DATE.getTime(),
    );

    const storedUser = await repository.findById(user.id);

    expect(storedUser).toEqual(result);
  });

  it("should partially update a user", async () => {
    const user = makeUser();

    await repository.create(user);

    const result = await updateUser.execute({
      id: user.id,
      name: "Maria Silva",
    });

    expect(result.id).toBe(user.id);
    expect(result.name).toBe("Maria Silva");

    // Campos não enviados devem ser preservados.
    expect(result.email).toBe("ana@example.com");
    expect(result.role).toBe("USER");

    // createdAt não deve mudar.
    expect(result.createdAt).toEqual(INITIAL_DATE);

    // updatedAt deve representar a atualização.
    expect(result.updatedAt.getTime()).toBeGreaterThan(
      INITIAL_DATE.getTime(),
    );

    // Confirma que a alteração também foi persistida.
    const storedUser = await repository.findById(user.id);

    expect(storedUser).toEqual(result);
  });
});