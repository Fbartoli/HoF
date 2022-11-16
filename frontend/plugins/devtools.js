export default (context, inject) => {
    // Define what we're going to inject
    const devconsole = {
        name: 'Console',
        console() {

            if (process.env.NODE_ENV === 'development') {
                console.log.apply(null, arguments)
            } else {
                console.debug.apply(null, arguments)
            }
        }
    }

    // Inject devconsole(msg) in Vue, context and store.
    // Called with this.$devtools.console(blah)
    inject('devtools', devconsole)

}