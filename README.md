# Modu Server

The project is generated by [LoopBack](http://loopback.io).

Modu server application

# Setting up your local environment
- Clone repo
- Make sure you have postgres installed
- Install npm dependencies i.e. `npm install`
- Create your `.env` file using `.env.example` as your template
   - Get your local postgres db and add it to your env filr
   - Add port number to env file
   - Set environment to `development`
- Run migrations witn `npm run migrate`. Note that running this command clears the content of the db if you previously had data there.
- Run `npm run dev` to start out the application.