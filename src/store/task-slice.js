import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getOfferCount = createAsyncThunk(
  "get_offer_count/getOfferCount",
  async () => {
    const res = await fetch("https://snetmyapp.herokuapp.com/get_offer_count");
    const off = await res.json();
    const offersCount = off.num_offers;
    return offersCount;
  }
);

export const getOffers = createAsyncThunk("cases/getOffers", async (caseId) => {
  const res = await fetch(`https://snetmyapp.herokuapp.com/${caseId}`);
  const off = await res.json();

  return off;
});

const initialTaskSlice = {
  isLogin: true,
  loading: false,
  offersCount: null,
  offers: { case1: [], case2: [], case3: [] },
};

const taskSlice = createSlice({
  name: "task",
  initialState: initialTaskSlice,
  reducers: {
    onLogin: (state) => {
      state.isLogin = false;
    },
    onLogout: (state) => {
      state.isLogin = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOfferCount.pending, () => {})
      .addCase(getOfferCount.fulfilled, (state, action) => {
        state.offersCount = action.payload;
      })
      .addCase(getOffers.pending, (state, action) => {
        state.loading = true;

        if (action.meta.arg === "case1") {
          state.offers.case1 = [];
        }
        if (action.meta.arg === "case2") {
          state.offers.case2 = [];
        }
        if (action.meta.arg === "case3") {
          state.offers.case3 = [];
        }
      })
      .addCase(getOffers.fulfilled, (state, action) => {
        if (action.meta.arg === "case1") {
          state.offers.case1 = [];
          state.offers.case1 = action.payload;
        }
        if (action.meta.arg === "case2") {
          state.loading = false;
          state.offers.case2 = action.payload;
        }
        if (action.meta.arg === "case3") {
          state.loading = false;
          console.log(action.payload);
          state.offers.case3 = [...state.offers.case3, action.payload].sort(
            (a, b) =>
              parseFloat(
                a.QuotaInfo.HasDiscount
                  ? a.QuotaInfo.PremiumWithDiscount
                  : a.Cash
              ) -
              parseFloat(
                b.QuotaInfo.HasDiscount
                  ? b.QuotaInfo.PremiumWithDiscount
                  : b.Cash
              )
          );
        }
      });
  },
});

export default taskSlice;

export const taskActions = taskSlice.actions;
