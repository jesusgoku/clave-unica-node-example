# Clave Única

This project is an example of integration with chilean authorization service [Clave Única](https://claveunica.gob.cl).

For use required of activate an account [here](https://claveunica.gob.cl/institucional/solicitud-activacion)

## Setup local environment

```bash
yarn install

# Copy and complete with your environment data
cp .env.dist .env
```

### Generate HTTPS certificates

```bash
# Domain setting in activation form
mkcert domain.com
```

# Modify your `/etc/hosts`

Add an entry

```
# Domain setting in activation form
127.0.0.1 domain.com
```

## Running

```bash
yarn run dev

# For production
yarn run start
```

Open your browser in configured domain: https://domain.com

## References

- [Manual de instalación](https://claveunica.gob.cl/institucional/manual-de-instalacion)
