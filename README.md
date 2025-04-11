# Front-End Internship Assignment Submission

## Project Title

Shopping Website using React + Fake Store API by Balvesh Puramkar

## Live Demo Link

https://grey-scientific-fakestore.netlify.app/

## GitHub Repository Link

https://github.com/developerbalvesh/Grey-Scientific-Labs-Shopping-Website-Using-React-Fake-Store-API.git

## Project Overview

This is my submission for the Front-End Internship Assignment, which involves building a shopping website using React.js and the Fake Store API. The application includes features for user authentication, product listing and filtering, detailed product views, and a functional shopping cart with checkout functionality.

## Key Features Implemented

* **Login Page:** Allows users to log in using the Fake Store API's authentication endpoint, storing a JWT token upon successful login and redirecting to the product listing page.
* **Product Listing Page (Home):** Displays all products fetched from the API, with the ability to filter products by category.
* **Product Detail Page:** Provides a detailed view of individual products, including their image, title, description, and price, along with an "Add to Cart" button.
* **Cart Page:** Shows the items added to the cart, allowing users remove items. It also displays the total price and includes a "Checkout" button that clears the cart and shows a temporary confirmation message.
* **Header / Navigation:** Includes links to navigate between the Home, Cart, and Logout pages. It also displays the current number of items in the cart. The Logout functionality clears the JWT token and redirects the user to the Login page.
* **Responsive Design:** The layout is designed to be responsive and adapts to different screen sizes, following a mobile-first approach.

## Tech Stack Used

* React.js (using Vite)
* React Router v6+
* React Hooks
* Context API for cart management and authentication management
* Plain CSS

## Instructions to Run Locally (Optional, but helpful)

If you'd like to run this project locally, please follow these steps:

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/developerbalvesh/Grey-Scientific-Labs-Shopping-Website-Using-React-Fake-Store-API.git
    cd Grey-Scientific-Labs-Shopping-Website-Using-React-Fake-Store-API
    make an .env file that contain
    * VITE_SERVER = https://fakestoreapi.com 
    ```

2.  **Install dependencies:**
    ```bash
    npm install  # or yarn install
    ```

3.  **Start the development server:**
    ```bash
    npm run dev  # or yarn dev
    ```

    This will usually start the application at `http://localhost:5173`.

## Notes and Considerations

* I did my best and put in all my effort for this assignment, as I always do on every assignment. Please provide feedback, even if it's negative. I would also appreciate positive feedback.

## Declaration of Original Work

I hereby declare that this submission is my own original work and that I have not copied code from GitHub, blogs, tutorials, or other candidates. I have independently developed the solution based on my understanding of front-end development principles and the assignment requirements.

Thank you for reviewing my submission.

Best regards,

Balvesh Puramkar