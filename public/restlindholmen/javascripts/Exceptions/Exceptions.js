/*
 * Developed by Steven BUCAILLE on 12/27/18 7:43 PM.
 * Last modified 12/27/18 7:43 PM .
 * Copyright (c) 2018. All right reserved.
 *
 */

// -------------------------------------
// GENERAL CLASS EXCEPTIONS
// -------------------------------------

function InstanceNotLoadedException(type) {
	this.type = type;
	this.message = `${type} instance is not loaded yet.`;
	this.name = "DiagramInstanceNotLoadedException";
}

function ClassInstanceNotLoadedException() {
	this.message = "Class instance is not loaded yet.";
	this.name = "ClassInstanceNotLoadedException";
}

function InfosNotLoadedException(type) {
	this.type = type;
	this.message = `Infos of the ${instance} are not loaded yet.`;
	this.name = "InfosNotLoadedException";
}

function InfosAlreadyLoadedException(type) {
	this.type = type;
	this.message = `Infos of the ${type} are already loaded.`;
	this.name = "InfosAlreadyLoadedException";
}

function ListOfIDNotLoadedException(type) {
	this.type = type;
	this.message = `List of ${type} id is not loaded.`;
	this.name = "ListOfIDNotLoadedException";
}

function ListOfIDAlreadyLoadedException(type) {
	this.type = type;
	this.message = `List of ${type} id is already loaded.`;
	this.name = "ListOfIDNotLoadedException";
}

function EntityIndexOutOfRangeException(type, id, entityAsked) {
	this.id = id;
	this.type = type;
	this.entityAsked = entityAsked;
	this.message = `This ${type} contains less than ${id} ${entityAsked} in its instance`;
	this.name = "ClassAttributesIndexOutOfRangeException";
}

// -------------------------------------
// DIAGRAM CLASS EXCEPTIONS
// -------------------------------------

function DiagramClassesIndexOutOfRangeException(classID) {
	this.message = "This diagram contains less than " + classID + " classes in it.";
	this.name = "DiagramClassesIndexOutOfRangeException";
}

// -------------------------------------
// CLASS CLASS EXCEPTIONS
// -------------------------------------

function ClassAttributesIndexOutOfRangeException(attributeID) {
	this.message = "This class contains less than " + attributeID + " attributes in it.";
	this.name = "ClassAttributesIndexOutOfRangeException";
}



// -------------------------------------
// ATTRIBUTE CLASS EXCEPTIONS
// -------------------------------------
