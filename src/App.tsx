import "./App.css";
import { JSX, useEffect, useState } from "react";
import axios from "axios";
import MediaCard from "./components/MediaCard";
import Grid from "@mui/system/Unstable_Grid";
import Typography from "@mui/material/Typography";
import UnstyledInputIntroduction from "./components/UnstyledInputIntroduction";
import UnstyledSelectIntroduction from "./components/UnstyledSelectIntroduction";
import {
  DataCart,
  DataDiscount,
  DataSourceCar,
  DataSourceDiscount,
} from "./lib/type";
import CartModal from "./components/CartModel";

function App(): JSX.Element {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [cart, setCart] = useState<DataCart[]>([]);
  const [discount, setDiscount] = useState<DataDiscount | null>(null);

  const [dataSourceCodeDiscount, setDataSourceCodeDiscount] = useState<
    DataSourceDiscount[]
  >([]);
  const [dataSourceCar, setDataSourceCard] = useState<DataSourceCar[]>([]);
  const config = {
    headers: {
      Authorization: "Bearer VPmo2U661gTnhMVx0pc0-CtahNg_aqS5DuneLtYfO1o",
    },
  };

  const fatchDataCar = async () => {
    try {
      const data = await axios.get(
        "https://cdn.contentful.com/spaces/vveq832fsd73/entries?content_type=car",
        config
      );
      if (data?.status === 200) {
        setDataSourceCard(data?.data?.items);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fatchCodeDiscount = async () => {
    try {
      const data = await axios.get(
        "https://cdn.contentful.com/spaces/vveq832fsd73/entries?content_type=discount",
        config
      );
      if (data?.status === 200) {
        setDataSourceCodeDiscount(data?.data?.items);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddCart = (data: DataCart) => {
    const cartAddData = cart;
    const indexDataCart = cartAddData.findIndex(
      (cad) => cad.title === data.title
    );
    if (indexDataCart >= 0) {
      cartAddData[indexDataCart].amount += 1;
    } else {
      cartAddData.push({ ...data, amount: 1 });
      setCart([...cartAddData]);
    }
  };

  const handleCodeDiscount = (e: any) => {
    if (e.key === "Enter") {
      const code = dataSourceCodeDiscount?.find(
        (dis) => dis.fields.code === e?.target?.value
      );
      if (code) {
        setDiscount(code?.fields);
      }
      e.target.value = "";
    }
  };

  const handleAdd = (value: string) => {
    const cartAddData = cart;
    const indexDataCart = cartAddData.findIndex((cad) => cad.title === value);
    cartAddData[indexDataCart].amount += 1;
    setCart([...cartAddData]);
  };

  const handleRemove = (value: string) => {
    const cartAddData = cart;
    const indexDataCart = cartAddData.findIndex((cad) => cad.title === value);
    cartAddData[indexDataCart].amount -= 1;
    if (cartAddData[indexDataCart].amount === 0) {
      cartAddData.splice(indexDataCart, 1);
      setCart([...cartAddData]);
    } else {
      setCart([...cartAddData]);
    }
  };

  useEffect(() => {
    if (cart.length > 0) {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart]);

  useEffect(() => {
    fatchDataCar();
    fatchCodeDiscount();

    const localCart = localStorage.getItem("cart");
    console.log(localCart);
    if (localCart !== null) {
      setCart(JSON.parse(localCart));
    }
  }, []);

  let data = dataSourceCar;
  if (search !== "") {
    data = data.filter((da) => da.fields.title.toLowerCase().match(search.toLowerCase()));
  }

  if (sort === "CAZ") {
    data = data.sort((a, b) => a.fields.title.localeCompare(b.fields.title));
  } else if (sort === "CZA") {
    data = data.sort((a, b) => b.fields.title.localeCompare(a.fields.title));
  } else if (sort === "PLH") {
    data = data.sort((a, b) => a.fields.price - a.fields.price);
  } else if (sort === "PHL") {
    data = data.sort((a, b) => b.fields.price - a.fields.price);
  }

  return (
    <div>
      <div className="app-header">
        <div className="flex">
          <img src="/interview-drivehub/logo.png" alt="logo" />
          <span className="self-center">DRIVERHUB</span>
        </div>
        <div onClick={handleOpen} className="flex">
          <img src="/interview-drivehub/Shopping.svg" alt="logo" width={38} height={32} />
          <p>Cart ({cart.length})</p>
        </div>
      </div>

      <div className="app-content">
        <Grid container className="header-title">
          <Grid xs={12} md={3}>
            <div>
              <Typography gutterBottom variant="h6" component="div">
                Car Available
              </Typography>
            </div>
          </Grid>
          <Grid>
            <div className="flex">
              <div>
                <UnstyledInputIntroduction
                  onChange={(e) => setSearch(e?.target?.value)}
                  aria-label="Search Car"
                  placeholder="Search Car"
                />
              </div>
              <div>
                <UnstyledSelectIntroduction
                  onChange={(value) => setSort(value)}
                />
              </div>
            </div>
          </Grid>
        </Grid>

        {/* แสดงรายการรถทั้งหมด  */}
        <Grid container spacing={2} className="body-grid">
          {data?.length > 0 &&
            data?.map((item, index) => {
              return (
                <Grid xs={12} md={3} key={index}>
                  <MediaCard item={item} handleAddCart={handleAddCart} />
                </Grid>
              );
            })}
        </Grid>
      </div>

      <div className="app-footer">
        <div>
          <Typography gutterBottom variant="h6" component="div">
            Drivehub Co., Ltd
          </Typography>
          <Typography gutterBottom variant="h6" component="div">
            193-195 Lake Rejada Office Complex, Ratchadapisek road, Khlong Toei,
            Bangkok
          </Typography>
        </div>
      </div>

      <CartModal
        open={open}
        handleClose={handleClose}
        cart={cart}
        handleCodeDiscount={handleCodeDiscount}
        handleAdd={handleAdd}
        discount={discount}
        handleRemove={handleRemove}
      />
    </div>
  );
}

export default App;
