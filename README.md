# NestJS Dependency Injection Notes

## Table of Contents
- [NestJS Dependency Injection Notes](#nestjs-dependency-injection-notes)
  - [Table of Contents](#table-of-contents)
  - [What is Dependency Injection?](#what-is-dependency-injection)
  - [Key Concepts in NestJS DI](#key-concepts-in-nestjs-di)
    - [1. Providers](#1-providers)
    - [2. Injectable Decorator (`@Injectable()`)](#2-injectable-decorator-injectable)
    - [3. Injection Tokens](#3-injection-tokens)
    - [4. Scopes in Providers](#4-scopes-in-providers)
    - [5. Custom Providers](#5-custom-providers)
    - [6. Modules and DI](#6-modules-and-di)
    - [7. Optional Dependencies](#7-optional-dependencies)
  - [Injection Types](#injection-types)
    - [1. Constructor-Based Injection](#1-constructor-based-injection)
    - [2. Property-Based Injection](#2-property-based-injection)
    - [3. Method-Based Injection](#3-method-based-injection)
  - [Provider Types](#provider-types)
    - [1. Standard Providers](#1-standard-providers)
    - [2. Factory Providers](#2-factory-providers)
    - [3. Value Providers](#3-value-providers)
  - [Injection Scopes](#injection-scopes)
    - [1. Singleton Scope](#1-singleton-scope)
    - [2. Request Scope](#2-request-scope)
    - [3. Transient Scope](#3-transient-scope)
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

- **Defining a Provider:**
  ```typescript
  @Injectable()
  export class MyService {
    getHello(): string {
      return 'Hello World!';
    }
  }
  ```

- Providers must be registered in the module where they will be used:
  ```typescript
  @Module({
    providers: [MyService],
  })
  export class AppModule {}
  ```

### 2. Injectable Decorator (`@Injectable()`)
- The `@Injectable()` decorator marks a class as a provider, making it available for DI.
- Without this decorator, the NestJS DI system cannot inject the class.

### 3. Injection Tokens
- Providers are typically identified by their class types. For custom tokens, use the `@Inject()` decorator.
- Example with a custom token:
  ```typescript
  const MY_TOKEN = 'MY_TOKEN';

  @Injectable()
  export class MyService {
    constructor(@Inject(MY_TOKEN) private readonly value: string) {}
  }

  @Module({
    providers: [
      {
        provide: MY_TOKEN,
        useValue: 'Injected Value',
      },
    ],
  })
  export class AppModule {}
  ```

### 4. Scopes in Providers
Providers can have different lifetimes:
- **Default (Singleton):** A single instance shared across the application.
- **Request Scope:** A new instance is created for each incoming request.
- **Transient Scope:** A new instance is created every time it's injected.

Example of a request-scoped provider:
```typescript
@Injectable({ scope: Scope.REQUEST })
export class RequestScopedService {}
```

### 5. Custom Providers
NestJS supports creating providers with:
- **`useValue`:** Provide a static value.
- **`useClass`:** Use a different implementation class.
- **`useFactory`:** Provide a factory function.
- **`useExisting`:** Alias another provider.

Example of `useFactory`:
```typescript
@Module({
  providers: [
    {
      provide: 'CUSTOM_PROVIDER',
      useFactory: () => {
        return new SomeService();
      },
    },
  ],
})
export class AppModule {}
```

### 6. Modules and DI
- Modules are the basic building blocks of NestJS applications.
- Providers are registered in modules and can be shared across other modules by exporting them.

Example:
```typescript
@Module({
  providers: [MyService],
  exports: [MyService],
})
export class SharedModule {}

@Module({
  imports: [SharedModule],
})
export class AppModule {}
```

### 7. Optional Dependencies
Use the `@Optional()` decorator to inject a dependency that may not always be provided:
```typescript
@Injectable()
export class MyService {
  constructor(@Optional() private readonly optionalDependency?: OptionalService) {}
}
```

---

## Injection Types

NestJS supports several types of dependency injection:

### 1. Constructor-Based Injection
- Dependencies are injected through the constructor of a class.
- Most common and preferred method.
- Example:
  ```typescript
  @Injectable()
  export class MyService {
    constructor(private readonly dependency: DependencyService) {}
  }
  ```

### 2. Property-Based Injection
- Dependencies are injected into class properties.
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
- Dependencies are passed as parameters to methods.
- Typically used with lifecycle hooks (e.g., `OnModuleInit`).
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

## Provider Types

### 1. Standard Providers
- These are simple classes annotated with `@Injectable()` and registered in the module.
- Example:
  ```typescript
  @Injectable()
  export class MyService {}

  @Module({
    providers: [MyService],
  })
  export class AppModule {}

  ```

### 2. Factory Providers
- Use a factory function to create the provider.
- Example:
  ```typescript
  @Module({
    providers: [
      {
        provide: 'FACTORY_PROVIDER',
        useFactory: () => {
          return new MyService();
        },
      },
    ],
  })
  export class AppModule {}
  ```

### 3. Value Providers
- Provide a static value.
- Example:
  ```typescript
  @Module({
    providers: [
      {
        provide: 'VALUE_PROVIDER',
        useValue: 'Some Static Value',
      },
    ],
  })
  export class AppModule {}
  ```

---

## Injection Scopes

### 1. Singleton Scope
- Default scope in NestJS.
- A single instance of the provider is shared across the entire application.

### 2. Request Scope
- A new instance of the provider is created for each incoming request.
- Example:
  ```typescript
  @Injectable({ scope: Scope.REQUEST })
  export class RequestScopedService {}
  ```

### 3. Transient Scope
- A new instance of the provider is created every time it is injected.
- Example:
  ```typescript
  @Injectable({ scope: Scope.TRANSIENT })
  export class TransientService {}
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
- NestJS provides the `forwardRef()` utility to resolve circular dependencies.
  ```typescript
  @Injectable()
  export class ServiceA {
    constructor(@Inject(forwardRef(() => ServiceB)) private serviceB: ServiceB) {}
  }

  @Injectable()
  export class ServiceB {
    constructor(private serviceA: ServiceA) {}
  }

  @Module({
    providers: [
      ServiceA,
      ServiceB,
    ],
  })
  export class AppModule {}
  ```

### 3. Global Providers
- Use the `@Global()` decorator on a module to make its providers globally available.
  ```typescript
  @Global()
  @Module({
    providers: [MyService],
    exports: [MyService],
  })
  export class GlobalModule {}
  ```

---

## Tips
- Always structure your application with modularity in mind to make DI easier to manage.
- Use `@Inject()` with custom tokens for non-class-based providers.
- Debug DI errors by checking if the provider is registered and exported in the correct module.
