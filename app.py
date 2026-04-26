from flask import Flask, render_template, request

# Create Flask app
app = Flask(__name__)

# Route for homepage
@app.route('/', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        # Get form data
        name = request.form['name']
        email = request.form['email']

        # Process data (for now just print)
        print(f"Name: {name}, Email: {email}")

        return f"Registration Successful! Welcome {name}"

    # For GET request → load form
    return render_template('index.html')

# Run app
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)