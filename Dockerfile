FROM node:22-alpine AS node

ENV APP_HOME /app
WORKDIR $APP_HOME/

# Install dependencies
RUN apk add --no-cache postgresql-client

# Install PNPM
ENV COREPACK_INTEGRITY_KEYS 0
RUN corepack enable && corepack prepare pnpm --activate

# Install NPM dependencies
ADD package.json $APP_HOME/
ADD pnpm-lock.yaml $APP_HOME/

RUN pnpm install

# Add web application
ADD . $APP_HOME/

# Build web application
RUN pnpm build

# Run web application
CMD ["pnpm", "run", "dev"]
