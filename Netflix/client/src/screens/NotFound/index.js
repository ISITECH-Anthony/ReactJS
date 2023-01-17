import NavigationBar from "../../components/NavigationBar"
import "./style.scss"

const NotFound = () => {
    return (
        <div className="page page__not_found">
            <NavigationBar active={true} />
            <div className="page__content">
                <h1>404</h1>
                <h2>Page not found</h2>
            </div>
        </div>
    )
}

export default NotFound
