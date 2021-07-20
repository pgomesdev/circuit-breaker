import CircuitBreaker from 'opossum';

function customDecorator() {
  const options = {
    timeout: 3000,
    errorThresholdPercentage: 25,
    resetTimeout: 60000,
    volumeThreshold: 5
  };

  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const method = descriptor.value;

    const breaker = new CircuitBreaker(method, options);
  
    // breaker.fallback(() => ({ message: 'Não foi possível processar sua transação. Tente novamente mais tarde.' }));

    console.log('target', target);
    console.log('propertyKey', propertyKey);
    console.log('descriptor', descriptor);

    descriptor.value = function (...args) {
      console.log('status', breaker.stats);

      return breaker.fire(...args);
    }

    return descriptor;
  }
}

class Requests {
  @customDecorator()
  async randomFunctionOne() {
    return new Promise((resolve, reject) => {
      const percentage = Math.random();
  
      setTimeout(() => {
        if (percentage > 0.25) {
          reject(new Error('Error'));
        } else {
          resolve('Success');
        }
      }, 2500)
    });
  }
}

export const requests = new Requests();