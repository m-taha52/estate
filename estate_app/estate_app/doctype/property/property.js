// Copyright (c) 2022, mohammed and contributors
// For license information, please see license.txt

frappe.ui.form.on('Property', {

	setup: function(frm) {
		//check amenities duplicate
		frm.check_amenities_duplicate = function (frm, row) {
			frm.doc.amenities.forEach(item => {
				//console.log(item.amenity);
				if(row.amenity == "" || row.idx == item.idx) {

				}
				else {
					if(row.amenity == item.amenity) {
						row.amenity = "";
						frappe.throw(`${item.amenity} already exists at row ${item.idx}`)
						frm.refresh_fields("amenities")
					}
				}
			})
		}

		frm.check_flat_against_outdoor_kitchen = function(frm, row) {
			if(row.amenity == "Outdoor Kitchen" && frm.doc.property_type == "Flat" ) {
				let amenity = $row.amenity
				row.amenity = "";
				frappe.throw(`${amenity} cannot be in a flat`)
				frm.refresh_fields("amenities")
				
		}

	}
},

	refresh: function(frm) {
		/* Create a custom button */
		frm.add_custom_button('Update Address', () => {
				/* Create a prompt where the first parameter is Address and 2nd parameter is the value to change */
			frappe.prompt("Address", ({value}) => {
				// if dialog box has a value
				if(value) {
					//set value then refresh field and then let the user know field has been updated
					frm.set_value("address", value)
					frm.refresh_field("address")
					frappe.msgprint(`Address Field Updated with ${value}`)
					// frm.save()
				}
			})
		}, "Actions")

		frm.add_custom_button("Check Property Types", () => {
				let property_type = frm.doc.property_type
				console.log(property_type)

				//make ajax call
				frappe.call({
					method: "estate_app.estate_app.doctype.property.api.check_property_types",  //dotted path to server method
					args: {
						"property_type": property_type
					},
					callback: function(r) {
						// code snippet
						console.log(r)
						if(r.message.length > 0) {
							let header = `<h3> Below Properties are of property type ${property_type} </h3>`
							let body = ``;
							r.message.forEach(d => {
								let content = `<p> Name: ${d.name} <a href="/app/property/${d.name}"> Visit </a>  </p>`
								body = body + content
							})
							let all = header + body
							//

							frappe.msgprint((all))
						}
					}
				});
		}, "Actions")


	
	}
});

frappe.ui.form.on('Property Amenity Detail', {
	
	amenity: function(frm, cdt, cdn) {
		//grab entire row
		//cdt, cdn helps you grab the entire row
		let row = locals[cdt][cdn];
		//console.log(row);
		frm.check_amenities_duplicate(frm, row)
		frm.check_flat_against_outdoor_kitchen(frm, row)
	}
})