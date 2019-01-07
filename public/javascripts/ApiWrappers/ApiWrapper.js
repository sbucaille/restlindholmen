/*
 * Developed by Steven BUCAILLE on 12/1/18 6:07 PM.
 * Last modified 12/1/18 6:01 PM.
 * Copyright (c) 2018. All right reserved.
 *
 */

console.log("import ApiWrapper");

let getArrayFromResult = (results) => {
    let tabOfIds = [];
    results.forEach((result) => {
        tabOfIds.push(result[Object.keys(result)[0]])
    });
    return tabOfIds;
};

// ENUM VISIBILITY---------
let VISIBILITY = {
    PUBLIC: 1,
    PROTECTED: 2,
    PRIVATE: 3
};
Object.freeze(VISIBILITY);
//--------------------------


//-------------------------- API WRAPPERS --------------------------
class DiagramWrapper {
    static async getDiagrams() {
        return await httpGet('/api/generics/diagram/allID', {})
    }

    static async getInfo(diagramID) {
        return await httpGet('/api/generics/diagram/info', {diagramID: diagramID})
    }

    static async getDiagramIDFromClass(classID) {
        return await httpGet('/api/generics/diagram/fromClass', {classID: classID})
    }

    static async getDiagramIDFromAttribute(attributeID) {
        return await httpGet('/api/generics/diagram/fromAttribute', {attributeID: attributeID})
    }

    static async getDiagramIDFromMethod(methodID) {
        return await httpGet('/api/generics/diagram/fromMethod', {methodID: methodID})
    }

    static async getDiagramIDFromMethodParameter(methodParameterID) {
        return await httpGet('/api/generics/diagram/fromMethodParameter', {methodParameterID: methodParameterID})
    }

    static async getDiagramIDFromAssociation(associationID) {
        return await httpGet('/api/generics/diagram/fromAssociation', {associationID: associationID})
    }

    static async getDiagramIDFromAssociationEnd(associationEndID) {
        return await httpGet('/api/generics/diagram/fromAssociationEnd', {associationEndID: associationEndID})
    }

    static async getDiagramIDFromDependency(dependencyID) {
        return await httpGet('/api/generics/diagram/fromDependency', {dependencyID: dependencyID})
    }

    static async getDiagramIDFromRealization(realizationID) {
        return await httpGet('/api/generics/diagram/fromRealization', {realizationID: realizationID})
    }

    static async getDiagramIDFromGeneralization(generalizationID) {
        return await httpGet('/api/generics/diagram/fromGeneralization', {generalizationID: generalizationID})
    }
}

class ClassWrapper {
    static async getClasses() {
        return await httpGet('/api/generics/class/allID', {})
    }

    static async getInfo(classID) {
        return await httpGet('/api/generics/class/info', {classID: classID})
    }

    static async getClassesFromDiagram(diagramID) {
        return await httpGet('/api/generics/class/fromDiagram', {diagramID: diagramID});
    }

    static async getClassesFromDiagram(diagramID) {
        return await httpGet('/api/generics/class/fromDiagram', {diagramID: diagramID});
    }
}

class AttributeWrapper {

    static async getAttributes() {
        return await httpGet('api/generics/attribute/allID', {});
    }

    static async getInfo(attributeID) {
        return await httpGet('/api/generics/attribute/info', {attributeID: attributeID});
    }

    static async getAttributesFromClass(classID) {
        return await httpGet('/api/generics/attribute/fromClass', {classID: classID});
    }
}

class MethodWrapper {

    static async getMethodsFromClass(classID) {
        return await httpGet('/api/generics/attribute/fromClass', {classID: classID});
    }
}

class MethodParamWrapper {

    static async getMethodParamsFromMethod(methodID) {
        return await httpGet('/api/generics/methodParam/fromMethod', {methodID: methodID});
    }
}

class AssociationWrapper {
    static async getAssociations() {
        return await httpGet('api/generics/association/allID', {});
    }

    static async getInfo(associationID) {
        return await httpGet('api/generics/association/info', {associationID: associationID});
    }

    static async getAssociationsFromDiagram(diagramID) {
        return await httpGet('api/generics/association/fromDiagram', {diagramID: diagramID});
    }
}

class AssociationEndWrapper {
    static async getAssociationEnds() {
        return await httpGet('api/generics/associationEnd/allID', {});
    }

    static async getInfo(associationEndID) {
        return await httpGet('api/generics/associationEnd/info', {associationEndID: associationEndID});
    }

    static async getAssociationEndsFromDiagram(diagramID) {
        return await httpGet('api/generics/associationEnd/fromDiagram', {diagramID: diagramID});
    }

    static async getAssociationEndsFromAssociation(associationID) {
        return await httpGet('api/generics/associationEnd/fromAssociation', {associationID: associationID});
    }
}

class DependencyWrapper {
    static async getDependencies() {
        return await httpGet('api/generics/dependency/allID', {});
    }

    static async getInfo(dependencyID) {
        return await httpGet('api/generics/dependency/info', {dependencyID: dependencyID});
    }

    static async getDependenciesFromDiagram(diagramID) {
        return await httpGet('api/generics/dependency/fromDiagram', {diagramID: diagramID});
    }

    static async getDependenciesFromSupplierClass(classID) {
        return await httpGet('api/generics/dependency/fromSupplierClass', {classID: classID});
    }

    static async getDependenciesFromClientClass(classID) {
        return await httpGet('api/generics/dependency/fromClientClass', {classID: classID});
    }
}

class RealizationWrapper {
    static async getRealizations() {
        return await httpGet('api/generics/realization/allID', {});
    }

    static async getInfo(realizationID) {
        return await httpGet('api/generics/realization/info', {realizationID: realizationID});
    }

    static async getRealizationsIDFromDiagram(diagramID) {
        return await httpGet('api/generics/realization/fromDiagram', {diagramID: diagramID});
    }

    static async getRealizationsFromSupplierClass(classID) {
        return await httpGet('api/generics/realization/fromSupplierClass', {classID: classID});
    }

    static async getRealizationsFromClientClass(classID) {
        return await httpGet('api/generics/realization/fromClientClass', {classID: classID});
    }
}

class GeneralizationWrapper {
    static async getGeneralizations() {
        return await httpGet('api/generics/generalization/allID', {});
    }

    static async getInfo(generalizationID) {
        return await httpGet('api/generics/generalization/info', {generalizationID: generalizationID});
    }

    static async getGeneralizationsIDFromDiagram(diagramID) {
        return await httpGet('api/generics/realization/fromDiagram', {diagramID: diagramID});
    }

    static async getGeneralizationsFromChildClass(classID) {
        return await httpGet('api/generics/generalization/fromChildClass', {classID: classID});
    }

    static async getGeneralizationsFromParentClass(classID) {
        return await httpGet('api/generics/generalization/fromParentClass', {classID: classID});
    }
}

class UMLFileWrapper {
    static async getUmlFiles() {
        return await httpGet('api/generics/umlfile/allID', {});
    }

    static async getInfo(umlFileID) {
        return await httpGet('api/generics/umlfile/info', {umlFileID: umlFileID});
    }
}

class CommitWrapper {
    static async getCommits() {
        return await httpGet('api/generics/commit/allID', {});
    }

    static async getInfo(commitID) {
        return await httpGet('api/generics/commit/info', {commitID: commitID});
    }
}

class FileCommitWrapper {
    static async getFileCommits() {
        return await httpGet('api/generics/filecommit/allID', {});
    }

    static async getInfo(fileCommitID) {
        return await httpGet('api/generics/filecommit/info', {fileCommitID: fileCommitID});
    }
}

class UserWrapper {
    static async getUsers() {
        return await httpGet('api/generics/user/allID', {});
    }

    static async getInfo(userID) {
        return await httpGet('api/generics/user/info', {userID: userID});
    }
}

class RepositoryWrapper {
    static async getRepositories() {
        return await httpGet('api/generics/repository/allID', {});
    }

    static async getInfo(repositoryID) {
        return await httpGet('api/generics/repository/info', {repositoryID: repositoryID})
    }
}