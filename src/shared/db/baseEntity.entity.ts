import { Entity, PrimaryKey, DateTimeType } from "@mikro-orm/core";

export abstract class BaseClass {
  
  @PrimaryKey()
  codigo?: number

    /*
  @Property({type: DateTimeType})
  createdAt?: new Date()

  @Property({type: DateTimeType, onUpdate: () => new Date()})
  updatedAt?: new Date()
  */

}

export abstract class BaseClass1 {
  
  @PrimaryKey()
  numPlato?: number
}

export abstract class BaseClass2 {
  
  @PrimaryKey()
  id?: number
}