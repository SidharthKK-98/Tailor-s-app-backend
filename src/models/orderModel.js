const mongoose=require('mongoose')


const measurementSchema = new mongoose.Schema({
    chest: { type: String,
             required: false
          },
    waist: { type: String,
             required: false 
           },
    length: { type: String,
              required: false 
            },
    sleeve : { type: String,
              required: false 
            },
    inseam: { type: String,
              required: false 
            },
    shoulder: { type: String, 
              required: false 
            }
}, { _id: false });



const orderSchema = new mongoose.Schema({

    userId: { type: mongoose.Schema.Types.ObjectId,
                 ref: 'users',
                 required: true 
                },
    addedItemId: { type: mongoose.Schema.Types.ObjectId,
                  ref: 'addItems',
                  required: true },
    measurements: { type: measurementSchema,
                     required: false 
                    }, 
    deliveryDate: { type: String, 
                    required: true
                  },
    finished: {
                    type: Boolean,
                    default: false 
                },
    expiresAt: { type: Date, 
      index: { expires: 0 } 
    }, // TTL Index for auto-deletion

}, { timestamps: true });




const orderItem= mongoose.model("orderItem",orderSchema)

module.exports= orderItem