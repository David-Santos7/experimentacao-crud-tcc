import { describe, expect, it } from "vitest";

import { User } from "../../src/domain/entities/User.js";

describe("User", () => {
  it("should create a valid user", () => {
    const date = new Date("2026-01-01T00:00:00.000Z");

    const user = new User({
      id: "user-1",
      name: "Ana Silva",
      email: "ana@example.com",
      role: "USER",
      createdAt: date,
      updatedAt: date,
    });

    expect(user.id).toBe("user-1");
    expect(user.name).toBe("Ana Silva");
    expect(user.email).toBe("ana@example.com");
    expect(user.role).toBe("USER");
    expect(user.createdAt).toEqual(date);
    expect(user.updatedAt).toEqual(date);
  });

  it("should reject an empty name", () => {
    const date = new Date("2026-01-01T00:00:00.000Z");

    expect(
      () =>
        new User({
          id: "user-1",
          name: "   ",
          email: "ana@example.com",
          role: "USER",
          createdAt: date,
          updatedAt: date,
        }),
    ).toThrow("User name is required.");
  });
});

it("should reject an empty email", () => {
  const date = new Date("2026-01-01T00:00:00.000Z");

  expect(
    () =>
      new User({
        id: "user-1",
        name: "Ana Silva",
        email: "   ",
        role: "USER",
        createdAt: date,
        updatedAt: date,
      }),
  ).toThrow("User email is required.");
});

it("should reject an invalid email", () => {
  const date = new Date("2026-01-01T00:00:00.000Z");

  expect(
    () =>
      new User({
        id: "user-1",
        name: "Ana Silva",
        email: "invalid-email",
        role: "USER",
        createdAt: date,
        updatedAt: date,
      }),
  ).toThrow("User email is invalid.");
});

it("should reject an invalid role", () => {
  const date = new Date("2026-01-01T00:00:00.000Z");

  expect(
    () =>
      new User({
        id: "user-1",
        name: "Ana Silva",
        email: "ana@example.com",
        role: "SUPER_ADMIN",
        createdAt: date,
        updatedAt: date,
      }),
  ).toThrow("User role must be USER or ADMIN.");
});

it("should normalize name and email", () => {
  const date = new Date("2026-01-01T00:00:00.000Z");

  const user = new User({
    id: "user-1",
    name: "  Ana Silva  ",
    email: "  ANA@EXAMPLE.COM  ",
    role: "USER",
    createdAt: date,
    updatedAt: date,
  });

  expect(user.name).toBe("Ana Silva");
  expect(user.email).toBe("ana@example.com");
});

it("should update user data", () => {
  const createdAt = new Date("2026-01-01T00:00:00.000Z");
  const updatedAt = new Date("2026-01-02T00:00:00.000Z");

  const user = new User({
    id: "user-1",
    name: "Ana Silva",
    email: "ana@example.com",
    role: "USER",
    createdAt,
    updatedAt: createdAt,
  });

  user.update(
    {
      name: "Maria Silva",
      email: "MARIA@EXAMPLE.COM",
      role: "ADMIN",
    },
    updatedAt,
  );

  expect(user.name).toBe("Maria Silva");
  expect(user.email).toBe("maria@example.com");
  expect(user.role).toBe("ADMIN");
  expect(user.createdAt).toEqual(createdAt);
  expect(user.updatedAt).toEqual(updatedAt);
});

it("should not partially update the user when validation fails", () => {
  const createdAt = new Date("2026-01-01T00:00:00.000Z");

  const user = new User({
    id: "user-1",
    name: "Ana Silva",
    email: "ana@example.com",
    role: "USER",
    createdAt,
    updatedAt: createdAt,
  });

  expect(() =>
    user.update(
      {
        name: "Maria Silva",
        email: "invalid-email",
        role: "ADMIN",
      },
      new Date("2026-01-02T00:00:00.000Z"),
    ),
  ).toThrow("User email is invalid.");

  expect(user.name).toBe("Ana Silva");
  expect(user.email).toBe("ana@example.com");
  expect(user.role).toBe("USER");
  expect(user.updatedAt).toEqual(createdAt);
});