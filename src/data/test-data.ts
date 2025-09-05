import { faker } from '@faker-js/faker';
export const testUsers = {
    standard: {
      username: process.env.SAUCE_USERNAME || 'musabajwa.18@gmail.com',
      password: process.env.SAUCE_PASSWORD || '09876543',
    },
    locked: {
      username: process.env.SAUCE_LOCKED_USERNAME || 'locked_out_user',
      password: process.env.SAUCE_PASSWORD || 'secret_sauce',
    },
    problem: {
      username: process.env.SAUCE_PROBLEM_USERNAME || 'problem_user',
      password: process.env.SAUCE_PASSWORD || 'secret_sauce',
    },
    performance: {
      username: process.env.SAUCE_PERFORMANCE_USERNAME || 'performance_glitch_user',
      password: process.env.SAUCE_PASSWORD || 'secret_sauce',
    },
  }; 
 
export const testSheds = {
  name: faker.company.name(),           // e.g. "Smith LLC"
  description: faker.lorem.sentence(),  // e.g. "Innovative shed for modern use."
  capacity: faker.number.int({ min: 50, max: 500 })
};