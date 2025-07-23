import React, { useEffect, useState } from "react";
import "./UserComp.scss";
import axios from "axios";

const UserComp = () => {
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    gender: "",
    city: "",
  });

  const [id, setId] = useState("");
  const [userList, setUserList] = useState([]);
  const cityArr = ["Pune", "Mumbai", "Latur"];

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    try {
      const response = await axios.get("http://localhost:5000/users");
      setUserList(response.data);
    } catch (error) {}
  };

  const addUserData = async () => {
    if (id) {
      try {
        const response = await axios.put(
          `http://localhost:5000/users/${id}`,
          userInfo
        );
        if (response) {
          getUser();
          setId("");
          setUserInfo({ name: "", email: "", gender: "", city: "" });
        }
      } catch (error) {}
    } else {
      try {
        const res = await axios.post("http://localhost:5000/users", userInfo);
        if (res) {
          getUser();
          setId("");
          setUserInfo({ name: "", email: "", gender: "", city: "" });
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const deleteUser = async (id) => {
    await axios.delete(`http://localhost:5000/users/${id}`);
    getUser();
  };

  const updateUser = (obj) => {
    setUserInfo({
      name: obj?.name,
      email: obj?.email,
      gender: obj?.gender,
      city: obj?.city,
    });
    setId(obj?.id);
  };
  return (
    <div className="mt-5">
      <h3 style={{ marginLeft: "125px" }}>User Management ({userList?.length >0 && userList?.length })</h3>
      <div className="col-md-10 m-auto border main-container">
        <div className="col-md-10 m-auto d-flex gap-5">
          <div className="col-md-5">
            <h4>Name</h4>
            <input
              type="text"
              value={userInfo?.name}
              onChange={(e) =>
                setUserInfo({ ...userInfo, name: e.target.value })
              }
              className="form-control "
            />
          </div>
          <div className="col-md-5">
            <h4>Email</h4>
            <input
              type="text"
              value={userInfo?.email}
              onChange={(e) =>
                setUserInfo({ ...userInfo, email: e.target.value })
              }
              className="form-control"
            />
          </div>
        </div>
        <div className="col-md-10 mt-3 m-auto d-flex gap-5">
          <div className="col-md-5">
            <h4>Gender</h4>
            <input
              type="radio"
              value="Male"
              className="fs-4"
              onChange={(e) =>
                setUserInfo({ ...userInfo, gender: e.target.value })
              }
              checked={userInfo.gender === "Male"}
            />
            Male
            <br />
            <input
              type="radio"
              value="Female"
              onChange={(e) =>
                setUserInfo({ ...userInfo, gender: e.target.value })
              }
              checked={userInfo.gender === "Female"}
            />
            Female
          </div>
          <div className="col-md-5">
            <h4>select your city</h4>
            <select
              className="form-select"
              name="city"
              id="city"
              value={userInfo.city}
              onChange={(e) =>
                setUserInfo({ ...userInfo, city: e.target.value })
              }
            >
              <option value="">select</option>
              {cityArr.map((c, i) => (
                <option key={i} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="col-md-10 m-auto d-flex gap-3 mt-3 ">
          <div>
            <button
              className="form-control btn btn-primary "
              onClick={addUserData}
            >
              {id ? "Update" : "Add"}
            </button>
          </div>
          <div>
            <button className="form-control btn btn-secondary">Clear</button>
          </div>
        </div>
      </div>
      <div className="col-md-10 m-auto mt-4">
        <table className="table ">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Gender</th>
              <th scope="col">City</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody className="table-group-divider">
            {userList.length > 0 ? (
              userList?.map((e) => (
                <tr key={e?.id}>
                  <td>{e?.name}</td>
                  <td>{e?.email}</td>
                  <td>{e?.gender}</td>
                  <td>{e?.city}</td>
                  <td>
                    <div className="d-flex gap-3 ">
                      <button
                        className="btn btn-success"
                        onClick={() => updateUser(e)}
                      >
                        Edit
                      </button>{" "}
                      <button
                        className="btn btn-danger"
                        onClick={() => deleteUser(e?.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center">
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserComp;
