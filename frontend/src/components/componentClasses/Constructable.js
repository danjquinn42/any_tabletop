export default class Constructable {
  constructor() {
    // Proxy handler
    const handler = {
      get: (target, prop) => {
        // Check if the property already exists
        if (prop in target) {
          return target[prop];
        }

        // Dynamically create the with* method
        const withField = prop.match(/^with(\w+)/);
        if (withField) {
          const fieldName =
            withField[1].charAt(0).toLowerCase() + withField[1].slice(1);
          if (fieldName in target) {
            return (value) => {
              // Dynamically call the validate method
              const validateMethod = `validate${withField[1]}`;
              if (
                typeof target[validateMethod] === "function"
                  ? target[validateMethod](value)
                  : true
              ) {
                target[fieldName] = value;
                return new Proxy(target, handler); // Ensure proxy is returned for chaining
              } else {
                console.warn(`Validation failed for field: ${fieldName}`);
                return new Proxy(target, handler); // Ensure proxy is returned for chaining even if validation fails
              }
            };
          }
        }

        // Dynamically create the validate* method
        const validateField = prop.match(/^validate(\w+)/);
        if (validateField) {
          const fieldName =
            validateField[1].charAt(0).toLowerCase() +
            validateField[1].slice(1);
          if (
            `validate${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}` in
            target
          ) {
            return () =>
              target[
                `validate${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}`
              ]();
          } else {
            return () => true; // Default validation returns true
          }
        }

        // Default behavior
        return target[prop];
      },
    };

    // Return a new proxy
    return new Proxy(this, handler);
  }

  // Default validation method (can be overridden by subclasses)
  validate() {
    return true;
  }
}
