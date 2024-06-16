import * as mongoose from 'mongoose';

export const mongoDBProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: async (): Promise<typeof mongoose> => {
      return await mongoose.connect(process.env.MONGODB_URI);
    },
  },
];
