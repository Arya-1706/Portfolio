import mongoose from 'mongoose';
import dns from 'node:dns';

if (process.env.DNS_SERVERS) {
  dns.setServers(
    process.env.DNS_SERVERS.split(',').map((s) => s.trim())
  );
}

let connectionPromise;

export const connectDB = async () => {
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }

  if (!connectionPromise) {
    connectionPromise = mongoose
      .connect(process.env.MONGO_URI)
      .then((conn) => {
        console.log(`MongoDB connected: ${conn.connection.host}`);
        return conn;
      })
      .catch((error) => {
        connectionPromise = null;
        throw error;
      });
  }

  return connectionPromise;
};
