const getEnv = ( key:string, defaultValue?:string ): string => {
      const value = process.env[key] || defaultValue
  
      if (value === undefined){
          throw new Error(`Missing enviroment key ${key}`)
      }
      return value
  }
  
  export const NODE_ENV = getEnv("NODE_ENV", "development")
  export const PORT = getEnv("PORT", "3000")
  export const APP_ORIGIN = getEnv("APP_ORIGIN")
  //   export const DB_URI = getEnv("DB_URI")
    export const DB_URI = getEnv("DB_URI", "postgres://username:password@host:port/database")
    export const DB_HOST = getEnv("DB_HOST", "localhost")
    export const DB_PORT = parseInt( getEnv("DB_PORT", "5432") )
    export const DB_NAME = getEnv("DB_NAME")
    export const DB_USER = getEnv("DB_USER")
    export const DB_PASSWORD = getEnv("DB_PASSWORD")