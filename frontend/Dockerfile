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

RUN npm ci

COPY . .

RUN npm run build

EXPOSE 3000

CMD [ "npm", "start" ]