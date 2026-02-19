
# --------- Stage 1: Build ---------
FROM node:20-alpine AS builder

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy project files
COPY . .

# Build Next.js app
RUN npm run build

# Ensure a runtime `next.config.js` exists for the final stage.
# Prefer an existing JS/CJS config; otherwise create an empty module so COPY won't fail.
RUN if [ -f next.config.js ]; then \
			cp next.config.js next.config.runtime.js; \
		elif [ -f next.config.cjs ]; then \
			cp next.config.cjs next.config.runtime.js; \
		else \
			echo "module.exports = {}" > next.config.runtime.js; \
		fi

# --------- Stage 2: Production ---------
FROM node:20-alpine

WORKDIR /app

ENV NODE_ENV=production

# Copy only necessary files from builder
COPY --from=builder /app/package*.json ./
RUN npm install --omit=dev

COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.runtime.js ./next.config.js

EXPOSE 3000

CMD ["npm", "start"]
