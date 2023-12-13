# moodule to run the app from localhost

from eccomerce import app

if __name__ == "__main__":
    app.run(debug=True,ssl_context=('cert.pem','key.pem'))