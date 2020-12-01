import React from 'react'
import Script from 'react-load-script'
export default function LoadScript({ scriptLoaded, loaded, url }) {

    function scriptCreated() {
        console.log('scriptCreated')
    }

    function scriptFailed() {
        console.log('scriptFailed')
    }

    const appendScript = () => {
        if (!loaded) {
            return (
                <Script
                    url={url}
                    onCreate={scriptCreated()}
                    onError={scriptFailed()}
                    onLoad={() => scriptLoaded()}
                />
            )
        }
    }

    return (
        <script>
            { appendScript()}
        </script>
    )
}
