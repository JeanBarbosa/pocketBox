import * as mongoose from 'mongoose';

export const mongoDBProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: async (): Promise<typeof mongoose> =>
      await mongoose.connect(
        'mongodb+srv://MongoDB:WuGizmaG34FqV465@cluster0.nsmrz0e.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',
      ),
  },
];
