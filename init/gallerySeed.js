const mongoose = require("mongoose");
const Gallery = require("../models/gallery");

mongoose.connect("mongodb://127.0.0.1:27017/humanhood");

const images = [
{
title:"Food Donation",
image:"/images/gallery/activity_image1.png",
description:"Volunteers distributing fresh vegetables and food supplies to elderly community members during a charity initiative."
},
{
title:"Clothes Distribution",
image:"/images/gallery/activity_image2.png",
description:"Volunteers handing over donated clothes and essential items to elderly individuals at an outdoor community support event."
},
{
title:"Supporting Elderly Citizens",
image:"/images/gallery/activity_image10.png",
description:"Community volunteers offering help and essential resources to elderly people as part of a social welfare initiative."
},
{
title: "Volunteer Helping Hands",
image:"/images/gallery/activity_image4.png",
description:"Young volunteers assisting senior citizens by providing daily necessities and promoting compassion through social service."
},
{
title:"Happy Moments",
image:"/images/gallery/activity_image5.png",
description:"Sharing smiles together."
},
{
title:"Kindness in Action",
image:"/images/gallery/activity_image6.png",
description:"A heartwarming moment where volunteers share donated goods with seniors, highlighting the spirit of generosity and community bonding."
},
{
title:"Birthday Celebration",
image:"/images/gallery/activity_image7.png",
description:"Celebrating with elderly residents."
},
{
title:"Tree Plantation",
image:"/images/gallery/activity_image8.png",
description:"Community plantation drive."
},
{
title:"Social Interaction",
image:"/images/gallery/activity_image9.png",
description:"Playing games together."
},
// {
// title:"Volunteer Support",
// image:"/images/gallery/activity_image10.png",
// description:"Helping the elderly community."
// }
];

async function seedGallery(){
await Gallery.deleteMany({});
await Gallery.insertMany(images);
console.log("Gallery Seeded");
mongoose.connection.close();
}

seedGallery();