import dotenv from "dotenv";

dotenv.config();

const { PORT: port, DEBUG: debug } = process.env;

interface Environments {
  port: number;
  debug: string;
}

const environments: Environments = {
  port: +port || 4001,
  debug,
};

export default environments;
