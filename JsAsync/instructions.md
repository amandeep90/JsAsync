# Instructions

Write a Javascript application that retrieves data from 4 endpoints and prints
the results _in order_.

The endpoints are:
 - https://t6v3t4hh5i.execute-api.us-west-2.amazonaws.com/latest/haiku/stanza1
 - https://t6v3t4hh5i.execute-api.us-west-2.amazonaws.com/latest/haiku/stanza2
 - https://t6v3t4hh5i.execute-api.us-west-2.amazonaws.com/latest/haiku/stanza3
 - https://t6v3t4hh5i.execute-api.us-west-2.amazonaws.com/latest/haiku/author


The response from the endpoints will be a JSON object which include a 'message'
key which will be part of your result.

The resource is protected by an API Key.
You will need to include an `x-api-key` header with your request.
The value should be set to the key provided to you for the test.

## Output

The output shall include:
 - The response code from the service
 - The amount of time (in milliseconds) the response took to retrieve
 - The 'message' value from the JSON response

It is important that the output is printed in the same order as the endpoints
are listed above.

## Environment

You can use either nodejs or a browser to perform this task (but please specify
which one you choose).
The results will be run on a version of Node (>= v6), or recent version of
Firefox (> v50) or Chrome (> v57).
