import { differenceInMinutes, differenceInHours, differenceInWeeks } from 'date-fns';
 export default function Card({data})
{
    // console.log("printing data",data);
    if(!data) return  null;
  const publisherIcons = {
    Wired: require("./logo/Wired_logo.svg.png"),
    "Gizmodo.com": require("./logo/Gizmodo_Media_Group_Logo.png"),
    "BBC News": require("./logo/BBC_News_(2008).svg.png"),
    "Yahoo Entertainment": require("./logo/yahoo.png"),
    MacRumors: require("./logo/Macrumours.png"),
    "Business Insider": require("./logo/Business_Insider_Logo.svg.png"),
    CNET: require("./logo/CNET-Logo-768x432.png"),
    NPR: require("./logo/National_Public_Radio_logo.svg.png"),
    VentureBeat: require("./logo/VentureBeat_logo.svg.png"),
    "The Verge": require("./logo/the-verge-vector-logo.png"),
    "Slashdot.org": require("./logo/Slashdot_logo.png"),
    Time: require("./logo/TIME-Logo-500x281.png"),
    "POWER magazine": require("./logo/power_logo.png"),
    "The Topeka Capital-Journal": require("./logo/Topeka-Capital-Journal.png"),
    "Wordpress.com": require("./logo/WordPress_blue_logo.svg.png"),
    "ABC News": require("./logo/ABC_News_logo_2021.svg.png"),
    "Fox News": require("./logo/Fox_News_Channel_logo.svg.png"),
    "Android Central": require("./logo/android_central.jpg"),
    "The Atlantic": require("./logo/TheAtlantic.webp"),
    "Android Police": require("./logo/android_police.png"),
    HYPEBEAST: require("./logo/HYPEBEAST-Logo_(2022).png"),
    "Xataka.com": require("./logo/xataka.jpg"),
    AppleInsider: require("./logo/power_logo.png"),
    "Hacker News": require("./logo/HackerNews.png"),
    "Phandroid - News for Android": require("./logo/phandroid.png"),
    Hackaday: require("./logo/hackaday-logo.webp"),
    ESPN: require("./logo/ESPN.png"),
    Hipertextual: require("./logo/Hipertextual.png"),
    "Digital Trends":require("./logo/digitaltrends_1.jpeg"),
    "Al Jazeera English":require("./logo/AlJazeera.webp"),
    "Lenta":require("./logo/lenta.jpeg"),
    "Jalopnik":require("./logo/jalopnik.webp"),
    "CBS News":require("./logo/cbsnews.png"),
    default:require("./logo/defaultnewsicon.png"),
    newswalldefault:require("./logo/newswalldefault.jpeg"),

  };

   
 return(
    <div className="card-container">
 
        {
         

            data.map((currItem,index)=>{
                const {title, description, url, urlToImage,source,publishedAt} = currItem ;
                if(!title || !description || !url || !urlToImage) return null;

                
          const publishedDate = new Date(publishedAt);
        const now = new Date();

        let timeAgo;
        const diffInWeeks = differenceInWeeks(now, publishedDate);
        const diffInHours = differenceInHours(now, publishedDate);
        const diffInMinutes = differenceInMinutes(now, publishedDate);

        if (diffInWeeks >= 1) {
          timeAgo = `${diffInWeeks}w`;  
        } else if (diffInHours >= 1) {
          timeAgo = `${diffInHours}h`;  
        } else {
          timeAgo = `${diffInMinutes}m`;  
        }

                             
                const publisherIcon = publisherIcons[source.name];
 
           console.log(source.name);
                return (
                  <div key={index} className="card">
                    <img
                      src={urlToImage || publisherIcons.newswalldefault}
                      alt=""
                    />
                    <div className="card-content">
                      <div className="publisher-info">
                        <img
                          alt=""
                          src={publisherIcon || publisherIcons.default}
                          className="publisher-icon"
                        />
                        <span className="publisher-name">{source.name}</span>
                        <span className="separator"> • </span>
                        <span className="published-time">{timeAgo}</span>
                      </div>
                      <div className="title">{title}</div>
                      <div className="content">{description}</div>
                    </div>
                    <a
                      href={url}
                      target="_blank"
                      className="rdmore"
                      rel="noopener noreferrer"
                    >
                      Read More
                    </a>
                  </div>
                );
            }
        )
        }
    </div>
 );
}