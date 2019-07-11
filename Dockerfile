# Use node 10
FROM outrigger/node:10
USER root
ENV API_KEY=AIzaSyC5DO07v08R2xtICWlSYZGCjz3hB9EiEdI
ENV APP_PORT=3773

# Copy source code
COPY . /app
# Change working directory
WORKDIR /app

# Install dependencies
RUN npm install
RUN npm run build

# Expose API port to the outside
EXPOSE 3773

# Launch application
CMD ["npm","start"]
