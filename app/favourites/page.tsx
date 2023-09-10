import getCurrentUser from '../actions/getCurrentUser'
import getFavouriteListings from '../actions/getFavouriteListings'
import getReservations from '../actions/getReservations'
import ClientOnly from '../components/ClientOnly'
import EmptyState from '../components/EmptyState'
import FavouritesClient from './FavouritesClient'

const FavouritesPage = async () => {
  const currentUser = await getCurrentUser()
  const listings = await getFavouriteListings()

  if (!currentUser) {
    return (
      <ClientOnly>
        <EmptyState title="Unauthorized" subtitle="Please login!" />
      </ClientOnly>
    )
  }

  if (listings.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title="No favourites found"
          subtitle="Look like you haven no favourites listings"
        />
      </ClientOnly>
    )
  }

  return (
    <ClientOnly>
      <FavouritesClient listings={listings} currentUser={currentUser} />
    </ClientOnly>
  )
}

export default FavouritesPage
