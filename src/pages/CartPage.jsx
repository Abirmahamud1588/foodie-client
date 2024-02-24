import React, { useContext } from "react";
import { FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import { AuthContext } from "../Contexts/AuthProvider";
import usecart from "../hooks/usecart";

const calprice = (item) => {
  return item.price * item.quantity;
};

const CartPage = () => {
  const [cart, refetch] = usecart();
  const { user } = useContext(AuthContext);

  const handleDelete = (item) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://food-iota-lovat.vercel.app/carts/${item._id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              refetch();
              Swal.fire({
                title: "Deleted!",
                text: `${item.name} Delted from the Cart`,
                icon: "success",
              });
            }
          });
      }
    });
  };

  const handleQuantityChange = (index, action) => {
    const updatedCart = [...cart];
    const item = updatedCart[index];
    if (action === "increment") {
      item.quantity += 1;
      refetch();
    } else if (action === "decrement" && item.quantity > 1) {
      item.quantity -= 1;
      refetch();
    }
    // Update the price based on quantity

    // Update the cart in the backend
    fetch(`https://food-iota-lovat.vercel.app/carts/${item._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    });
  };
  const calculateTotalPrice = () => {
    return cart
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  return (
    <div className="max-w-screen-2xl mx-auto px-4 ">
      <div className="py-20">
        {/* content */}
        <div className="text-center px-4 space-y-7">
          <h2 className="md:text-5xl text-4xl font-bold md:leading-snug leading-snug mb-10">
            Item Added In The<span className="text-green"> Food Cart</span>
          </h2>
        </div>
        <div className="">
          <table className="table">
            {/* head */}
            <thead className="bg-green text-white">
              <tr>
                <th>Food</th>
                <th>Name</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {cart.map((item, index) => (
                <tr key={index}>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img src={item.image} alt={item.name} />
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>{item.name}</td>

                  <td>
                    <button
                      className="btn btn-xs"
                      onClick={() => handleQuantityChange(index, "decrement")}
                    >
                      -
                    </button>
                    <input
                      type="number"
                      value={item.quantity}
                      className="w-10 overflow-hidden text-center"
                      readOnly
                    />
                    <button
                      className="btn btn-xs"
                      onClick={() => handleQuantityChange(index, "increment")}
                    >
                      +
                    </button>
                  </td>

                  <td>${calprice(item)}</td>
                  <td>
                    <FaTrash
                      className="text-red hover:scale-150 transition duration-500 cursor-pointer "
                      onClick={() => handleDelete(item)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
            {/* foot */}
            <tfoot>
              <tr>
                <th></th>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      <h1 className="text-center font-bold text-2xl my-3">
        {user.displayName} Cart Info
      </h1>
      <div className="flex justify-center ">
        <div className="stats shadow">
          <div className="stat">
            <div className="stat-figure text-primary"></div>
            <div className="stat-title">Total Price</div>
            <div className="stat-value text-green">
              ${calculateTotalPrice()}
            </div>
          </div>

          <div className="stat">
            <div className="stat-figure text-secondary"></div>
            <div className="stat-title">Total Items</div>
            <div className="stat-value text-green">{cart.length}</div>
          </div>
          <div className="stat">
            <div className="stat-figure text-secondary"></div>
            <div className="stat-title">User Email</div>
            <div className="stat-title text-secondary font-bold">
              {user.email}
            </div>
          </div>
          <div className="stat">
            <div className="stat-figure text-secondary"></div>
            <div className="stat-title">User Id</div>
            <div className="stat-title text-secondary font-bold">
              {user.uid}
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center my-5">
        <button className="btn text-white bg-green text-center">
          Checkout
        </button>
      </div>
    </div>
  );
};

export default CartPage;
