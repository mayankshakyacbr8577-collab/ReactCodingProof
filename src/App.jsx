
import React from 'react'
import Login from "./component/Login.jsx";
import Tools from "./component/Tool.jsx";
import Header from './component/Header/header.jsx'
import Body from './component/body/body.jsx'
import Footer from './component/footer/footer.jsx'
import { Routes, Route } from 'react-router-dom'
import Error404 from "./component/Error404.jsx";
import Product from './component/product.jsx'
import Contact from "./component/Contact.jsx";
import Home from "./component/Home.jsx"; // 
import { lazy, Suspense } from "react";
import Spinner from "./component/Spinner.jsx";

const RegistrationForm = lazy(
  () => import("./component/body/RegistrationForm.jsx")
);

const App = () => {
  return (
    <div className="container mt-5">

      <Header />

      <Routes>

        {/* Home Route */}
        
        <Route path="/login" element={<Login />} />

        <Route path="/tools" element={<Tools />} />

        <Route path="/home" element={<Home />} />

        <Route path="/" element={<Body />} />

        <Route
          path="/register"
          element={
            <Suspense fallback={<Spinner />}>
              <RegistrationForm />
            </Suspense>
          }
        />

        <Route
          path="/contact"
          element={<Contact />}
        />

        <Route
          path="/product/:id"
          element={<Product />}
        />

        <Route
          path="*"
          element={<Error404 />}
        />

      </Routes>

      <Footer />

    </div>
  )
}

export default App