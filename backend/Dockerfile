FROM node:20.15.0-alpine3.19

# Create Group
RUN addgroup -S group

# Create User
RUN adduser -S user -G group

# Create app directory
WORKDIR /app

# Make user the owner of the directory
RUN chown -R user:group /app

# Change to user
USER user

COPY package*.json ./

RUN npm ci --omit=dev

COPY . .

# Change to root
USER root

# Give full permissions to logs directory
RUN chmod -R 777 /app/src/logs/

# Run npx prisma generate as root
RUN npx prisma generate

# Change to user
USER user

EXPOSE 3000

CMD [ "npm", "run", "prod" ]
