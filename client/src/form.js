import { Button, Dropdown, Menu, Table } from "antd";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { TextField } from '@material-ui/core';
import axios from 'axios';
import toran2 from './image/toran2.jpg'
import { useReactToPrint } from "react-to-print";
import { Typography } from '@material-ui/core';


//for development
 //const baseurl = "http://localhost:7000/api"

//for production 
const baseurl = "/api"


function CustomTable({ data }) {
  const [columnItems, setColumnItems] = useState([]);
  const [columnsToShow, setColumnsToShow] = useState([]);

  const columns = [
    {
      title: "Serial No.",
    dataIndex: "serialNumber",
    key: "serialNumber"
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      responsive: ["md"]
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount"
    },
    {
      title: "Receipt",
      dataIndex: "receipt",
      key: "receipt",
      render: (text, record) => (

        <Link to={`/poster/${record._id}`}>
          <Button variant="contained">View Receipt</Button>
        </Link>
      ),
    },

  ];

  useEffect(() => {
    setColumnItems(menuItems);
    setColumnsToShow(columns);
  }, []);

  const colVisibilityClickHandler = (col) => {
    const ifColFound = columnsToShow.find((item) => item.key === col.key);
    if (ifColFound) {
      const filteredColumnsToShow = columnsToShow.filter(
        (item) => item.key !== col.key
      );
      setColumnsToShow(filteredColumnsToShow);
    } else {
      const foundIndex = columns.findIndex((item) => item.key === col.key);
      const foundCol = columns.find((item) => item.key === col.key);
      let updatedColumnsToShow = [...columnsToShow];
      updatedColumnsToShow.splice(foundIndex, 0, foundCol);
      setColumnsToShow(updatedColumnsToShow);
    }
  };

  const menuItems = columns.map((item) => {
    return {
      key: item.key,
      label: <span>{item.title}</span>
    };
  });
  const addKeys = (arr) => {
    return arr.map((item, index) => {
      return {
        ...item,
        serialNumber: index + 1
      };
    });
  };
  
  

  //   const addKeys = (arr) => arr.map((i) => ({ ...i, key: i.id }));
  // const addKeys = (arr) => arr.map((i, index) => ({ ...i, key: i.id, serialNumber: index + 1 }));

  return (
    <div>
      <div style={{ marginBottom: "30px" }}>
        <Dropdown
          overlay={
            <Menu onClick={colVisibilityClickHandler} items={columnItems} />
          }
          placement="bottomLeft"
        >
          <Button>Column Visibility</Button>
        </Dropdown>
      </div>
      <div>
        <div>
          <Table
            scroll={{ x: true }}
            columns={columnsToShow}
            dataSource={data ? addKeys(data) : []}
            
          />
        </div>


      </div>
    </div>
  );
}

const FormExample = () => {
  const [data, setData] = useState([])
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    amount: ""
  })


  const handleonchange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSubmit = (event) => {
    // console.log(event);
    event.preventDefault();
    const form = {
      name: formData.name,
      address: formData.address,
      amount: formData.amount
    };
    setFormData({
      name: "",
      address: "",
      amount: ""
    })

    const first = () => {
      return axios
        .post(`${baseurl}/submit`, form)
        .then((response) => {
          // console.log(response);
          return response;
        }
        )
        .catch((err) => {
          console.log(err)
        })
    }

    first();
  }
  useEffect(() => {
    const getallusers = async () => {
      const get = axios.get(`${baseurl}/getallusers`)
        .then((res) => {
          //  console.log(res.data.data);
          setData(res.data.data);
        })
        .catch((err) => {
          console.log(err);
        })
    }
    getallusers();
  }, [handleSubmit])

 

  return (


    <div className="card column-design" >

      <div className="card-body" style={{ backgroundImage: 'url()' }}>
        <div className="front" style={{ backgroundColor: '#FA7D09' }}>
          <Typography variant="h6" align="center">
            <b>|| श्री गणेशाय नमः ||</b>
          </Typography>
          <br />
          <Typography variant="h2" align="center">
            <b>श्री गजानन नगर गणेश उत्सव मंडळ</b>
          </Typography>
          <Typography variant="h5" align="center">
            गजानन नगर वर्धा रोड, नागपूर
          </Typography>


          <hr />
        </div>
        <br /><br />
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>


          <form onSubmit={handleSubmit} style={{ border: '2px solid black', padding: '40px', borderColor: "Green" }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <label htmlFor="नाव"><b>नाव:</b></label> &nbsp;&nbsp;
              <TextField
                label="name"
                name="name"
                value={formData.name}
                onChange={handleonchange}
                required
              />
            </div>

            <br /><br />
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <label htmlFor="पत्ता"><b>पत्ता:</b></label> &nbsp;&nbsp;
              <TextField
                type="text"
                label="address"
                name='address'
                value={formData.address}
                onChange={handleonchange}
                required
                multiline
              />
            </div>
            <br /><br />
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <label htmlFor="रक्कम"><b>रक्कम:</b></label> &nbsp;&nbsp;
              <TextField
                label="amount"
                name='amount'
                value={formData.amount}
                onChange={handleonchange}
                required
                type="text"
              />
            </div>
            <br /><br />

            <button variant="contained" type="submit">Save</button>
          </form>
        </div>
        <br></br>

        <div>
          <h2><u>Lists of Peoples</u></h2>
          <CustomTable data={data} />
        </div>
      </div>
    </div>
  );

}
export default FormExample;



