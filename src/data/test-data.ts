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
 
export const shedsData = {
  name: faker.company.name(),           
  description: faker.lorem.sentence(),  
  capacity: faker.number.int({ min: 50, max: 500 })
};

export const doctorsData = {
  name: faker.company.name(),
  address: faker.lorem.sentence(),
  phone: faker.phone.number({ style: 'international' }),           
  description: faker.lorem.sentence(),  

};