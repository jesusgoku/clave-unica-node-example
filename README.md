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
mkcert claveunica-dev.jesusurrutia.com
```

# Modify your `/etc/hosts`

Add an entry

```
127.0.0.1 claveunica-dev.jesusurrutia.com
```

## Running

```bash
yarn run start
```

## References

- [Manual de instalación](https://claveunica.gob.cl/institucional/manual-de-instalacion)
