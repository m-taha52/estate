# Copyright (c) 2022, mohammed and contributors
# For license information, please see license.txt

# import frappe
from frappe.model.document import Document
import frappe

class Property(Document):
	pass

	# def after_insert(self):
	# 	frappe.msgprint(__('Document updated successfully'));

	#validate
	# def validate(self):
	# 	if(self.property_type == "Flat"):
	# 		for amenity in self.amenities:
	# 			if(amenity.amenity == "Outdoor Kitchen"):
	# 				frappe.throw((f'Property of type <b> Flat </b> should not have amenity <b> {amenity[0].amenity} </b>'))


	# 	# #SQL:
	# 	# 	amenity = frappe.db.sql(f"""SELECT amenity FROM `tabProperty Amenity Detail` WHERE parent = {self.name} AND parenttype="property" AND amenity = "Outdoor Kitchen";""", as_dict = True)
	# 	# 	print(f"""\n\n{amenity}""")
	# 	# 	if(amenity):
	# 	# 				frappe.throw((f'Property of type <b> Flat </b> should not have amenity <b> {amenity[0].amenity} </b>'))
