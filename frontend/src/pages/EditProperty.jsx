import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  getSingleProperty,
  updateProperty,
} from "../redux/thunks/propertyThunks";

import { useParams, useNavigate } from "react-router-dom";

const EditProperty = () => {

  const { id } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { singleProperty } = useSelector(
    (state) => state.properties
  );

  const [formData, setFormData] = useState({});

  useEffect(() => {
    dispatch(getSingleProperty(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (singleProperty) {
      setFormData(singleProperty);
    }
  }, [singleProperty]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {

    e.preventDefault();

    dispatch(updateProperty({
      id,
      propertyData: formData,
    }));

    navigate("/adminDashboard");
  };

  return (
    <div>

      <h1>Edit Property</h1>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          name="title"
          value={formData.title || ""}
          onChange={handleChange}
        />

        <input
          type="number"
          name="price"
          value={formData.price || ""}
          onChange={handleChange}
        />

        <button type="submit">
          Update Property
        </button>

      </form>

    </div>
  );
};

export default EditProperty;