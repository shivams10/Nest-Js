# NestJS Dependency Injection Notes

## Table of Contents
- [NestJS Dependency Injection Notes](#nestjs-dependency-injection-notes)
  - [Table of Contents](#table-of-contents)
  - [What is Dependency Injection?](#what-is-dependency-injection)
  - [Key Concepts in NestJS DI](#key-concepts-in-nestjs-di)
    - [1. Providers](#1-providers)
    - [2. Services](#2-services)
    - [3. Injectable Decorator (`@Injectable()`)](#3-injectable-decorator-injectable)
    - [4. Injection Tokens](#4-injection-tokens)
    - [5. Scopes in Providers](#5-scopes-in-providers)
    - [6. Custom Providers](#6-custom-providers)
    - [7. Modules and DI](#7-modules-and-di)
    - [8. Optional Dependencies](#8-optional-dependencies)
  - [Injection Types](#injection-types)
    - [1. Constructor-Based Injection](#1-constructor-based-injection)
    - [2. Property-Based Injection](#2-property-based-injection)
    - [3. Method-Based Injection](#3-method-based-injection)
  - [Common Patterns](#common-patterns)
    - [1. Service Injection into Controllers](#1-service-injection-into-controllers)
    - [2. Circular Dependency](#2-circular-dependency)
    - [3. Global Providers](#3-global-providers)
  - [Tips](#tips)

---

## What is Dependency Injection?
Dependency Injection (DI) is a design pattern where an object receives its dependencies from an external source rather than creating them itself. In **NestJS**, DI is built into its core and is facilitated by its modular architecture.

---

## Key Concepts in NestJS DI

### 1. Providers
Providers are the core concept of DI in NestJS. A provider can be a service, repository, factory, or any custom class. They are injected into other classes (e.g., controllers, services) where needed.

### 2. Services
Services are a special type of provider that contain business logic and reusable functionalities. They are defined using the `@Injectable()` decorator and are injected into controllers or other services.

- **Defining a Service:**
  ```typescript
  @Injectable()
  export class UserService {
    getUsers(): string[] {
      return ['User1', 'User2'];
    }
  }
  ```

- **Injecting a Service into a Controller:**
  ```typescript
  @Controller('users')
  export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get()
    getAllUsers(): string[] {
      return this.userService.getUsers();
    }
  }
  ```

- **Registering a Service in a Module:**
  ```typescript
  @Module({
    providers: [UserService],
    controllers: [UserController],
  })
  export class UserModule {}
  ```

### 3. Injectable Decorator (`@Injectable()`)
- The `@Injectable()` decorator marks a class as a provider, making it available for DI.
- Without this decorator, the NestJS DI system cannot inject the class.

### 4. Injection Tokens
- Providers are typically identified by their class types. For custom tokens, use the `@Inject()` decorator.
- Example with a custom token:
  ```typescript
  const MY_TOKEN = 'MY_TOKEN';

  @Injectable()
  export class MyService {
    constructor(@Inject(MY_TOKEN) private readonly value: string) {}
  }
  ```

### 5. Scopes in Providers
Providers can have different lifetimes:
- **Default (Singleton):** A single instance shared across the application.
- **Request Scope:** A new instance is created for each incoming request.
- **Transient Scope:** A new instance is created every time it's injected.

### 6. Custom Providers
NestJS supports creating providers with:
- **`useValue`**: Provide a static value.
- **`useClass`**: Use a different implementation class.
- **`useFactory`**: Provide a factory function.
- **`useExisting`**: Alias another provider.

### 7. Modules and DI
- Modules are the basic building blocks of NestJS applications.
- Providers are registered in modules and can be shared across other modules by exporting them.

### 8. Optional Dependencies
Use the `@Optional()` decorator to inject a dependency that may not always be provided.

---

## Injection Types

### 1. Constructor-Based Injection
- Most common and preferred method.
- Example:
  ```typescript
  @Injectable()
  export class MyService {
    constructor(private readonly dependency: DependencyService) {}
  }
  ```

### 2. Property-Based Injection
- Requires the `@Inject()` decorator.
- Example:
  ```typescript
  @Injectable()
  export class MyService {
    @Inject(DependencyService)
    private readonly dependency: DependencyService;
  }
  ```

### 3. Method-Based Injection
- Typically used with lifecycle hooks.
- Example:
  ```typescript
  @Injectable()
  export class MyService implements OnModuleInit {
    private dependency: DependencyService;
    constructor(@Inject(DependencyService) private dep: DependencyService) {}
    onModuleInit() {
      this.dependency = this.dep;
    }
  }
  ```

---

## Common Patterns

### 1. Service Injection into Controllers
```typescript
@Controller()
export class AppController {
  constructor(private readonly myService: MyService) {}
  @Get()
  getHello(): string {
    return this.myService.getHello();
  }
}
```

### 2. Circular Dependency
- Use `forwardRef()` to resolve circular dependencies.

### 3. Global Providers
- Use the `@Global()` decorator to make providers globally available.

---

## Tips
- Always structure your application with modularity in mind.
- Use `@Inject()` with custom tokens for non-class-based providers.
- Debug DI errors by checking if the provider is registered and exported in the correct module.

