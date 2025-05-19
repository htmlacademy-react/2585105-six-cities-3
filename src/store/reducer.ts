
// type initialState = {
//     selectedCity: string;
//     offers: OfferType[];
//     activeSort: string;
//     authorizationStatus: AuthorizationStatus;
//     loadingStatus: boolean;
//     user: UserData | null;
//     countFavoritesOffer: number;
//     offer: OfferType | null;
//     nearByOffer: OfferType[] | null;
//     comments: CommentType[] | null;
//     comment: CommentData | null;
// }

// const initialState: initialState = {
//   selectedCity: 'Paris',
//   offers: [],
//   activeSort: SortBy.Popular,
//   authorizationStatus: AuthorizationStatus.Unknown,
//   loadingStatus: false,
//   user: null,
//   countFavoritesOffer: 0,
//   offer: null,
//   nearByOffer: null,
//   comments: null,
//   comment: null
// };

// export const reducer = createReducer(initialState, (builder) => {
//   builder
//     .addCase(changeCity, (state, action) => {
//       state.selectedCity = action.payload;
//     })
//     .addCase(updateOffers, (state, action) => {
//       state.offers = action.payload;
//     })
//     .addCase(changeSorting, (state, action) => {
//       state.activeSort = action.payload;
//     })
//     .addCase(loadOffers, (state, action) => {
//       state.offers = action.payload;
//     })
//     .addCase(requireAuthorization, (state, action) => {
//       state.authorizationStatus = action.payload.status as AuthorizationStatus;
//       state.user = action.payload.user;
//     })
//     .addCase(setOfferDataLoadingStatus, (state, action) => {
//       state.loadingStatus = action.payload;
//     })
//     .addCase(fetchOffer.fulfilled, (state, action) => {
//       state.offer = action.payload;
//     })
//     .addCase(loadNearOffer, (state, action) => {
//       state.nearByOffer = action.payload;
//     })
//     .addCase(fetchReview.fulfilled, (state, action) => {
//       state.comments = action.payload;
//     })
//     .addCase(dropOffer, (state) => {
//       state.comments = null;
//       state.offer = null;
//       state.nearByOffer = null;
//     })
//     .addCase(addComment, (state, action) => {
//       state.comment = action.payload;
//     });
// });
