import { View, Text } from "react-native";
import React from "react";
import Book from "../types/Book";

interface ViewBookProps {
  book: Book;
}

export default function ViewBook({ book }: ViewBookProps) {
  return (
    <View
      style={{ borderTopColor: "darkblue", borderTopWidth: 1, marginTop: 12 }}
    >
      <Text>id: {book.id}</Text>
      <Text>Title: {book.title}</Text>
      <Text>Author: {book.author}</Text>
      <Text>Pages: {book.pages}</Text>
    </View>
  );
}
