
import "./topBox.scss"
import { topDealUsers } from '../../data'
import { useGetRecentStudentsQuery } from "../../features/redux/users/Studentslice";
import { data } from "react-router";
const TopBox = () => {
  const { data, isLoading, isError, refetch } = useGetRecentStudentsQuery();
  


return (
    <div className="topBox">
      <h1>Recents Students</h1>
      <div className="list">
        {data?.map(user=>(
          <div className="listItem" key={user.id}>
            <div className="user">
              <img src={user.img} alt="" />
              <div className="userTexts">
                <span className="username">{user.firstName} {user.lastName}</span>
                <span className="email">{user.email}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TopBox